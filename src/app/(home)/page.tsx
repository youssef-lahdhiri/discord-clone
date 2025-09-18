import  '../../../public/bg-img.png'
import { Button } from '@/components/ui/button';
import InfoCard from './info-card';
import Footer from './footer';
const Home = () => {
    const props=[{header:"Create an invite-only place where you belong"
        ,content:"Discord servers are organized into topic-based channels where you can collaborate, share, and just talk about your day without clogging up a group chat."},{
           header:"Where hanging out is easy",content:"Grab a seat in a voice channel when you’re free. Friends in your server can see you’re around and instantly pop in to talk without having to call."

        },{header:"From few to a fandom",content:"Get any community running with moderation tools and custom member access. Give members special powers, set up private channels, and more."}]
    return (  
<>  <div className="w-full h-[100vh] bg-[url('/bg-img.png')] bg-cover bg-center  bg-[#404EED]">
    <div className=' flex   items-center justify-around w-full  h-20 '>
            <img src="/logo.png" alt="" />
            <p className='text-center w-[70%] font-bold '>Download Nitro Discover Safety Support Blog Careers</p>
            <Button className='  cursor-pointer rounded-full bg-white float-right '><a href="/setup">Login</a></Button></div>
            <p className='text-4xl text-center font-extrabold mt-[15dvh]'>Imagine a place...</p>
            <p className='text-center w-[55%] mx-auto mt-5'>...where you can belong to a school club, a gaming group, or a worldwide art community. Where just you and a handful of friends can spend time together. A place that makes it easy to talk every day and hang out more often.</p>
       <div className=' mt-5 w-fit mx-auto flex gap-2'><Button className=' rounded-full'><a href="/setup">Download for Windows</a></Button>
       <Button className=' cursor-pointer bg-[#23272A] text-white rounded-full '><a href="/setup">Open Discord in your browser</a></Button>
        <div className="grid grid-cols-2"></div>
<p  className="w-full  h-full text-wrap "> </p>

        </div>
        </div>
        {props.map((p,index)=><InfoCard key={index} index={index} header={p.header} text={p.content}/>)}
        <Footer></Footer>
        </>
      
    );
}
 
export default Home;