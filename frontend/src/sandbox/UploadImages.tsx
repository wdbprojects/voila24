import { useEffect, useRef, useState } from "react";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button as ButtonNextUI, Card, Image } from "@nextui-org/react";
import { ImageMinus, ImagePlus, Trash } from "lucide-react";
import { useForm } from "react-hook-form";
import { useGetProductDetailsQuery } from "@/redux/api/productsApi";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const wait = () => {
  new Promise((resolve) => {
    setTimeout(resolve, 1000);
  });
};

const UploadImages = ({ productId }) => {
  const [open, setOpen] = useState(false);
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);
  const [uploadedImages, setUploadedImages] = useState([]);

  const { data } = useGetProductDetailsQuery(productId);
  const wait = () => new Promise((resolve) => setTimeout(resolve, 1000));

  const form = useForm({
    defaultValues: {
      image: "",
    },
  });

  const onSubmit = async (value) => {
    wait().then(() => {
      setOpen(false);
    });
    console.log(value);
  };

  const onChangeUpload = (event) => {
    const files = Array.from(event.target.files);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((oldArray) => {
            return [...oldArray, reader.result];
          });
          setImages((oldArray) => {
            return [...oldArray, reader.result];
          });
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleImagePreviewRemove = (image) => {
    const filteredImagesPreview = imagesPreview.filter((img) => {
      return img !== image;
    });
    setImages(filteredImagesPreview);
    setImagesPreview(filteredImagesPreview);
  };

  useEffect(() => {
    if (data?.product) {
      setUploadedImages(data?.product.images);
    }
  }, [data]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="icon" variant="outline">
          <ImagePlus size={20} color="#999999" />
        </Button>
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-md"
        onInteractOutside={(event) => {
          event.preventDefault();
        }}
        onEscapeKeyDown={(event) => {
          event.preventDefault();
        }}
      >
        <DialogHeader>
          <DialogTitle>Upload Product Images</DialogTitle>
          <DialogDescription>
            Click on "Browse" to select the images you want to upload
          </DialogDescription>
        </DialogHeader>
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => {
                  return (
                    <FormItem className="w-full h-full">
                      <FormControl>
                        <Input
                          placeholder="Upload Image"
                          className="h-auto p-4 cursor-pointer rounded-16 "
                          type="file"
                          multiple
                          {...field}
                          onChange={(event) => {
                            field.onChange(event.target.value);
                            onChangeUpload(event);
                          }}
                          value={field.value}
                        />
                      </FormControl>
                    </FormItem>
                  );
                }}
              />
              <div className="mt-4">
                <h3 className="mb-2">New Images</h3>
                <div className="flex flex-wrap gap-4">
                  {imagesPreview.map((image, index) => {
                    return (
                      <Card
                        key={index}
                        radius="sm"
                        className="border-none w-[120px] flex p-1 justify-center items-center gap-1"
                      >
                        <Image
                          width={120}
                          height={120}
                          radius="sm"
                          alt={data?.product?.name}
                          src={image}
                          className="h-[110px] object-cover"
                        />

                        <ButtonNextUI
                          className="text-tiny text-white bg-black/50 dark:bg-black/20 w-[100px]"
                          variant="flat"
                          color="default"
                          radius="lg"
                          size="sm"
                          onClick={() => {
                            handleImagePreviewRemove(image);
                          }}
                        >
                          <ImageMinus size={16} />
                          Remove
                        </ButtonNextUI>
                      </Card>
                    );
                  })}
                </div>
              </div>
              <div className="mt-4">
                <h3 className="mb-2">Product Uploaded Images</h3>
                <div className="flex flex-wrap gap-4">
                  {uploadedImages.map((image) => {
                    return (
                      <Card
                        key={image?._id}
                        radius="sm"
                        className="border-none w-[120px] flex p-1 justify-center items-center gap-1"
                      >
                        <Image
                          width={120}
                          height={120}
                          radius="sm"
                          alt={data?.product?.name}
                          src={image?.url}
                          className="h-[110px] object-cover"
                        />

                        <ButtonNextUI
                          className="text-tiny text-white bg-black/50 dark:bg-black/20 w-[100px]"
                          variant="flat"
                          color="default"
                          radius="lg"
                          size="sm"
                        >
                          <Trash size={16} />
                          Delete
                        </ButtonNextUI>
                      </Card>
                    );
                  })}
                </div>
              </div>

              <div className="mt-6 flex justify-between items-center gap-4">
                <DialogClose asChild>
                  <ButtonNextUI
                    size="sm"
                    color="default"
                    variant="flat"
                    className="w-full"
                  >
                    Close
                  </ButtonNextUI>
                </DialogClose>
                <ButtonNextUI
                  size="sm"
                  color="success"
                  className="w-full font-medium"
                  type="submit"
                >
                  Upload Image
                </ButtonNextUI>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UploadImages;
