import { useState, useEffect } from 'react';

export default function LikeButton({ slug }) {
  const [likes, setLikes] = useState(0);

 
  useEffect(() => {
    const fetchLikes = async () => {
      const response = await fetch(
        `https://blogastrok-default-rtdb.europe-west1.firebasedatabase.app/posts/${slug}/likes.json`
      );
      const data = await response.json();
      setLikes(data || 0); 
    };

    fetchLikes();
  }, [slug]);

 
  const handleClick = async () => {
    const newLikes = likes + 1;
    setLikes(newLikes);

    await fetch(
      `https://blogastrok-default-rtdb.europe-west1.firebasedatabase.app/posts/${slug}/likes.json`,
      {
        method: 'PUT', 
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newLikes),
      }
    );
  };

  return (
    <button
      className="text-white bg-gray-500 rounded-md px-4 py-2 transform transition-all hover:scale-110"
      onClick={handleClick}
    >
      <img className="h-16 inline-block mr-2" src="/like2.png" alt="Like" />
      {likes} Likes
    </button>
  );
}
