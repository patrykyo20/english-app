'use client'

import Hero from '@/components/layout/Hero';
import Menu from '@/components/layout/Menu';
import OurService from '@/components/layout/OurService';
import { useUserContext } from '@/context/userProvider';

export default function Home() {
  return (
    <>
      <Hero />
      <Menu />
      <OurService />
    </>
  );
}
