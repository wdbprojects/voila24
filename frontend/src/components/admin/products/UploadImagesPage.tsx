import { useEffect, useState } from "react";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button as ButtonNextUI, Card, Image } from "@nextui-org/react";
import { ImageMinus, Trash } from "lucide-react";
import { useForm } from "react-hook-form";
import {
  useGetProductDetailsQuery,
  useUploadProductImagesMutation,
  useDeleteProductImageMutation,
} from "@/redux/api/productsApi";

import AdminLayout from "@/components/layout/AdminLayout";
import { Link, useParams } from "react-router-dom";
import { toast } from "sonner";
import UploadBreadcrumbs from "./UploadBreadcrumbs";

const UploadImagesPage = () => {
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);
  const [uploadedImages, setUploadedImages] = useState([]);

  const params = useParams();
  const productId = params?.id;

  const { data } = useGetProductDetailsQuery(productId);
  const [uploadProductImages, { isLoading, error, isSuccess }] =
    useUploadProductImagesMutation();
  const [
    deleteProductImage,
    { isLoading: isDeleteLoading, error: deleteError },
  ] = useDeleteProductImageMutation();

  const form = useForm({
    defaultValues: {
      image: "",
    },
  });

  const onSubmit = async () => {
    try {
      const { data } = uploadProductImages({ id: productId, body: { images } });
      if (data) {
        //navigate("/admin/products");
        console.log(data);
      }
    } catch (err) {
      console.log(err);
    }
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

  const deleteImage = async (imgId) => {
    try {
      const { data } = await deleteProductImage({
        id: params.id,
        body: { imgId },
      });
      if (data) toast.success("Message deleted successfully");
    } catch (err) {
      console.log(`Error from try/catch" ${err}`);
    }
  };

  useEffect(() => {
    if (data?.product) {
      setUploadedImages(data?.product.images);
    }

    if (error) {
      toast.error(error?.message);
    }
    if (deleteError) {
      toast.error(deleteError?.message);
    }
    if (isSuccess) {
      setImagesPreview([]);
      toast.success(`Image(s) uploaded successfully.`);
    }
  }, [data, error, isSuccess, deleteError]);

  return (
    <AdminLayout>
      <UploadBreadcrumbs productName={data?.product?.name} />
      <div className="max-w-lg mx-auto my-4">
        <div className="mb-4">
          <h2 className="text-xl">Upload Product Images</h2>
          <h4 className="text-sm text-neutral-500">
            Click on "Browse" to select the images you want to upload
          </h4>
        </div>
        <Form {...form}>
          <form
            encType="multipart/form-data"
            onSubmit={form.handleSubmit(onSubmit)}
          >
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
            {imagesPreview.length > 0 && (
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
            )}
            {uploadedImages.length > 0 && (
              <div className="mt-4">
                <h3 className="mb-2">Product Uploaded Images</h3>
                <div className="flex flex-wrap gap-4">
                  {uploadedImages.map((image, index) => {
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
                          src={image?.url}
                          className="h-[110px] object-cover"
                        />

                        <ButtonNextUI
                          className="text-tiny text-white bg-black/50 dark:bg-black/20 w-[100px]"
                          variant="flat"
                          color="default"
                          radius="lg"
                          size="sm"
                          onClick={() => {
                            deleteImage(image?.public_id);
                          }}
                          isLoading={isLoading ? true : false}
                          isDisabled={
                            isLoading || isDeleteLoading ? true : false
                          }
                        >
                          <Trash size={16} />
                          Delete
                        </ButtonNextUI>
                      </Card>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="mt-8 flex justify-center items-center gap-4">
              <ButtonNextUI
                size="sm"
                color="default"
                className="w-full font-medium text-sm"
                type="submit"
                isLoading={isLoading ? true : false}
                isDisabled={isLoading ? true : false}
              >
                <Link to="/admin/products">Back to Products</Link>
              </ButtonNextUI>
              <ButtonNextUI
                size="sm"
                color="success"
                className="w-full font-medium text-sm"
                type="submit"
                isLoading={isLoading ? true : false}
                isDisabled={isLoading || isDeleteLoading ? true : false}
              >
                Upload Images
              </ButtonNextUI>
            </div>
          </form>
        </Form>
      </div>
    </AdminLayout>
  );
};

export default UploadImagesPage;
