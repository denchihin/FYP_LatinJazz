const Tracklist = ({trackers, title}) => {

   return (
       <div className="blog-BlogList">
       <h2>{title}</h2>

       {trackers.map((trackers)=>(
           <div className="blog-preview" key={trackers.id}>
            <h2 className="fw-bolder pb-3 text-start">Artwork : {trackers.artTitle} </h2>
            <h2 className="fw-bolder pb-3 text-start">Artwork Owner : {trackers.owner} </h2>
            <h4 className="fw-normal pb-3 text-start">Owner Type : { trackers.ownertype}</h4>
            <h4 className="fw-normal pb-3 text-start">Price : { trackers.cost}</h4>
            <h4 className="fw-normal pb-3 text-start">Last Transaction Date : { trackers.trdtime}</h4>
            </div> 
       ))}
       
       </div>
     );
}

export default Tracklist;