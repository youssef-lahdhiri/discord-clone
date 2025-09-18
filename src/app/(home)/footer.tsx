import { Button } from "@/components/ui/button";
const Footer = () => {
    return (
        <div className="h-[10vh] ">
            <div className="items-center flex gap-[82vw] mx-4  h-full ">
                <img className="" src="/logo.png" alt="" />
                <Button className=" float-right">  <a href="/signup">Sign up</a></Button>
            </div>
        </div>
      );
}
 
export default Footer;