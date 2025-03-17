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

                <Button
                  className="text-tiny text-white bg-black/50 dark:bg-black/20 w-[100px]"
                  variant="flat"
                  color="default"
                  radius="lg"
                  size="sm"
                >
                  <Filter size={16} />
                  Filter
                </Button>
              </Card>
            );
          })}

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

                    <Button
                      className="text-tiny text-white bg-black/50 dark:bg-black/20 w-[100px]"
                      variant="flat"
                      color="default"
                      radius="lg"
                      size="sm"
                    >
                      <Trash size={16} />
                      Remove
                    </Button>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-between items-center gap-4">
        <Button
          size="sm"
          color="default"
          variant="flat"
          onPress={onClose}
          className="w-full"
        >
          Close
        </Button>
        <Button
          size="sm"
          color="success"
          className="w-full font-medium"
          type="submit"
        >
          Upload Image
        </Button>
      </div>
    </form>
  </Form>
</div>;
