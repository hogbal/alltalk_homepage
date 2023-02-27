import React, { useEffect, useState } from "react";
import "./Gallery.scss";

import axios from "axios";

import image2 from "../../assets/imgs/image1.jpg";

const Gallery = (props) => {
  const { imgs } = props;

  const [image, setImage] = useState([]);
  const [test, setTest] = useState(false);

  const Image = async (img, id) => {
    if (id < imgs.length) {
      await axios({
        method: "POST",
        url: img,
        responseType: "blob",
      }).then((res) => {
        const url = window.URL.createObjectURL(
          new Blob([res.data], { type: res.headers["content-type"] })
        );
        if (id === 0)
          setCurrentItem({ id: id, image: url, title: `${id}${url}` });

        setImage((prev) => [
          ...prev,
          { id: id, image: url, title: `${id}${url}` },
        ]);
      });
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setTest(true);
    }, 1000);
  }, []);

  useEffect(() => {
    imgs.map((item, index) => Image(item, index));
    image.sort((a, b) => a.id - b.id);
  }, [test]);

  const [data, setData] = useState([{ id: 2, image: image2, title: "고양이" }]);
  const [currentItem, setCurrentItem] = useState({
    id: "",
    image: "",
    title: "",
  });

  const currentView = (id) => {
    setCurrentItem(image.find((item) => item.id === id));
  };

  return (
    <div className="gallery">
      <div className="gallery-view">
        <img src={currentItem.image} alt={currentItem.title} />

        <div className="gallery-view-number">{`${currentItem.id + 1}/${
          imgs.length
        }`}</div>
      </div>
      <div className="gallery-list">
        {image.map((item) => (
          <>
            <li onClick={() => currentView(item.id)}>
              {
                <img
                  src={item.image}
                  alt={item.title}
                  className={`${item.id === currentItem.id && "currentimg"}`}
                />
              }
            </li>
          </>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
