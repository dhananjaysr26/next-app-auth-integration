import NavBar from "@/common/Navbar";
import { navItems } from "@/utils/global";

export default function DocsPage() {
  return (
    <>
      <NavBar navItems={navItems} />
      <main>
        <h1 className=" pt-8">Docs Page</h1>
      </main>
    </>
  );
}
