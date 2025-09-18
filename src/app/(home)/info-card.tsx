

const InfoCard = ({header,text,index}:{index:number,header:string,text:string}) => {
    return ( 
        <div className={`${index%2==0?"bg-white":"bg-[#F6F6F6]"} flex items-center h-[70dvh] text-black`}>
        <div className={`flex ${index%2==0?"":"flex-row-reverse"} mx-auto   w-[70dvw] items-center `}>
            <img src={`frame${index+1}.png`} alt="" />
            <div className="text-center">
            <p className="text-3xl text-center font-bold mb-2">{header}</p>
            <p>{text}</p></div>
        </div></div>
     );
}
 
export default InfoCard;