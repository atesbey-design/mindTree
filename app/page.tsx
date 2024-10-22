'use client'
import Image from "next/image";
import dynamic from 'next/dynamic';

const FlowchartWithNoSSR = dynamic(() => import('@/components/flowchart'), {
  ssr: false,
});

export default function Home() {
  return (
    <FlowchartWithNoSSR />
  );
}
