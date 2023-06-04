"use client";
import { useState, ChangeEvent } from 'react';

import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export default function IndexPage() {
  const [title, setTitle] = useState('');
  const [localName, setLocalName] = useState('');
  const [koreanName, setKoreanName] = useState('');
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [mainImage, setMainImage] = useState('');
  const [link, setLink] = useState('');

  const [menu, setMenu] = useState("");
  const [menus, setMenus] = useState<{ id: number; name: string }[]>([]);
  const [subImage, setSubImage] = useState("");
  const [subImages, setSubImages] = useState<{ id: number; name: string }[]>([]);

  const queryClient = useQueryClient()

  const {mutate} = useMutation(
    async () => await axios.post('/api/post', {
      title,
      localName,
      koreanName,
      latitude,
      longitude,
      address,
      description,
      phoneNumber,
      mainImage,
      link,
      subImages : subImages.map((a) => a.name),
      menus : menus.map((a) => a.name)
    }),
    {
      onError: (error) => {
        if(error) {
          console.log(error);
        }
      },
      onSuccess: (data) => {
        queryClient.invalidateQueries(["posts"])
      }
    }
  )

  const submitPost = async (e : React.FormEvent) => {
    e.preventDefault();

    mutate()
  }


  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    switch (name) {
      case 'title':
        setTitle(value);
        break;
      case 'localName':
        setLocalName(value);
        break;
      case 'koreanName':
        setKoreanName(value);
        break;
      case 'latitude':
        setLatitude(value);
        break;
      case 'longitude':
        setLongitude(value);
        break;
      case 'address':
        setAddress(value);
        break;
      case 'description':
        setDescription(value);
        break;
      case 'phoneNumber':
        setPhoneNumber(value);
        break;
      case 'mainImage':
        setMainImage(value);
        break;
      case 'link':
        setLink(value);
        break;
      case 'menu':
        setMenu(value);
        break;
      case 'subImages':
        setSubImage(value);
        break;
      default:
        break;
    }
  };

  function addMenu() {
    if (!menu) {
      return;
    }

    // 중복 검사
    const isDuplicate = menus.some((t) => t.name === menu);
    if (isDuplicate) {
      return;
    }
    const newTag = {
      id: menus.length + 1,
      name: menu
    };

    setMenus([...menus, newTag]);
    setMenu("");
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter" || event.key === ",") {
      event.preventDefault();
      addMenu();
    }
  }
  function addImage() {
    if (!subImage) {
      return;
    }

    // 중복 검사
    const isDuplicate = subImages.some((t) => t.name === subImage);
    if (isDuplicate) {
      return;
    }
    const newTag = {
      id: subImage.length + 1,
      name: subImage
    };

    setSubImages([...subImages, newTag]);
    setSubImage("");
  }

  function handleKeyDownImage(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter" || event.key === ",") {
      event.preventDefault();
      addImage();
    }
  }

  return (
    <form onSubmit={submitPost} className='flex flex-col gap-8'>
      <div>
        <label htmlFor="title">Title</label>
        <input className='bg-red-100' type="text" name="title" value={title} onChange={handleInputChange} />
      </div>
      <div>
        <label htmlFor="localName">Local Name</label>
        <input className='bg-red-100' type="text" name="localName" value={localName} onChange={handleInputChange} />
      </div>
      <div>
        <label htmlFor="koreanName">Korean Name</label>
        <input className='bg-red-100' type="text" name="koreanName" value={koreanName} onChange={handleInputChange} />
      </div>
      <div>
        <label htmlFor="latitude">Latitude</label>
        <input className='bg-red-100' type="text" name="latitude" value={latitude} onChange={handleInputChange} />
      </div>
      <div>
        <label htmlFor="longitude">Longitude</label>
        <input className='bg-red-100' type="text" name="longitude" value={longitude} onChange={handleInputChange} />
      </div>
      <div>
        <label htmlFor="address">Address</label>
        <input className='bg-red-100' type="text" name="address" value={address} onChange={handleInputChange} />
      </div>
      <div>
        <label htmlFor="description">Description</label>
        <textarea className='bg-red-100' name="description" value={description} onChange={handleInputChange} />
      </div>
      <div>
        <label htmlFor="phoneNumber">Phone Number</label>
        <input className='bg-red-100' type="text" name="phoneNumber" value={phoneNumber} onChange={handleInputChange} />
      </div>
      <div>
        <label htmlFor="mainImage">Main Image</label>
        <input className='bg-red-100' type="text" name="mainImage" value={mainImage} onChange={handleInputChange} />
      </div>
      <div>
        <label htmlFor="link">Link</label>
        <input className='bg-red-100' type="text" name="link" value={link} onChange={handleInputChange} />
      </div>

      <div>
        <label htmlFor="menu">Menu</label>
        <input onKeyDown={handleKeyDown}
          className='bg-red-100' type="text" name="menu" value={menu} onChange={handleInputChange} />
        {menus.map((menu) => (
          <div key={menu.name}>{menu.name}</div>
        ))}
      </div>
      <div>
        <label htmlFor="subImages">Sub Images</label>
        <input onKeyDown={handleKeyDownImage} className='bg-red-100' type="text" name="subImages" value={subImage} onChange={handleInputChange} />
        {subImages.map((menu) => (
          <div key={menu.name}>{menu.name}</div>
        ))}
      </div>
      <button type="submit">submit</button>
    </form>
  )
}
