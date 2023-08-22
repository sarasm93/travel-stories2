import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import StoryPage from "../stories/StoryPage";
  

const PopularStoryPage = () => {
  const [hasLoaded, setHasLoaded] = useState(false);
  const { id } = useParams();
  const [stories, setStories] = useState({ results: [] });


  useEffect(() => {
    const fetchData = async () => {
      try {
        const [ { data } ] = await Promise.all([ axiosReq.get(`/stories/${id}/`)
          ]);
        setStories(data);
        setHasLoaded(true);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [id, setStories]);


  return (
    <div>
        <StoryPage storyId={id}/>
    </div>
  )
}

export default PopularStoryPage