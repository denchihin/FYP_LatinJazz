const Tracklist = ({trackers, title}) => {

   return (
       <div className="blog-BlogList">
       <h2>{title}</h2>

       {trackers.map((tracker)=>(
           <div className="blog-preview" key={tracker.id}>
           <h2>Transfer to : {tracker.owner} </h2>
           <p>Written by { tracker.ownertype}</p>
           <p>Written by { tracker.trdtime}</p>
           <p>Written by { tracker.cost}</p>
           </div> 
       ))}
       
       </div>
     );
}

export default Tracklist;