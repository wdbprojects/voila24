import Container from "@/components/comps/Container";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="sm:flex sm:justify-between py-1  bg-gray-900 text-neutral-100 dark:bg-slate-800 dark:text-neutral-500">
      <Container>
        <div className="px-4 lg:px-6 flex h-12 items-center justify-between w-full">
          <h3 className="w-full block text-sm text-center font-normal text-neutral-300 dark:text-neutral-500">
            SHOPIT23 &copy; {currentYear} - All Rights Reserved
          </h3>
        </div>
      </Container>
    </footer>
  );
};
export default Footer;
