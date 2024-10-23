"use client"
import React, { useState } from 'react';

interface LeafDetailProps {
  selectedNode: {
    id: string;
    data: {
      title?: string;
      description?: string;
      studySource?: string;
      solvedProblems?: string;
      videoLink?: string;
      studyDuration?: number;
      importantPoints?: string;
    };
  };
  onSave: (data: LeafDetailData) => void;
}

interface LeafDetailData {
  title: string;
  description: string;
  studySource: string;
  solvedProblems: string;
  videoLink: string;
  studyDuration: number;
  importantPoints: string;
}

export default function LeafDetail({ selectedNode, onSave }: LeafDetailProps) {
  const [formData, setFormData] = useState<LeafDetailData>({
    title: selectedNode?.data?.title || '',
    description: selectedNode?.data?.description || '',
    studySource: selectedNode?.data?.studySource || '',
    solvedProblems: selectedNode?.data?.solvedProblems || '',
    videoLink: selectedNode?.data?.videoLink || '',
    studyDuration: selectedNode?.data?.studyDuration || 0,
    importantPoints: selectedNode?.data?.importantPoints || '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 p-8 bg-[#FF6B6B] border-8 border-black shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] rounded-none">
      <div className="mb-6">
        <label htmlFor="title" className="block text-4xl font-extrabold text-black mb-2">Konu Başlığı</label>
        <input
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="w-full border-8 border-black text-3xl p-4 bg-[#FFEB3B] text-black placeholder-black focus:outline-none focus:ring-8 focus:ring-black shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] transition-all hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
          required
        />
      </div>

      <div className="mb-6">
        <label htmlFor="description" className="block text-4xl font-extrabold text-black mb-2">Açıklama</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full border-8 border-black text-3xl p-4 bg-[#FFEB3B] text-black placeholder-black focus:outline-none focus:ring-8 focus:ring-black shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] transition-all hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
          rows={3}
          required
        />
      </div>

      <div className="mb-6">
        <label htmlFor="studySource" className="block text-4xl font-extrabold text-black mb-2">Çalışma Kaynağı</label>
        <input
          id="studySource"
          name="studySource"
          value={formData.studySource}
          onChange={handleChange}
          className="w-full border-8 border-black text-3xl p-4 bg-[#FFEB3B] text-black placeholder-black focus:outline-none focus:ring-8 focus:ring-black shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] transition-all hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
          required
        />
      </div>

      <div className="mb-6">
        <label htmlFor="solvedProblems" className="block text-4xl font-extrabold text-black mb-2">Çözülen Problemler</label>
        <textarea
          id="solvedProblems"
          name="solvedProblems"
          value={formData.solvedProblems}
          onChange={handleChange}
          className="w-full border-8 border-black text-3xl p-4 bg-[#FFEB3B] text-black placeholder-black focus:outline-none focus:ring-8 focus:ring-black shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] transition-all hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
          rows={3}
        />
      </div>

      <div className="mb-6">
        <label htmlFor="videoLink" className="block text-4xl font-extrabold text-black mb-2">Video Linki</label>
        <input
          id="videoLink"
          name="videoLink"
          type="url"
          value={formData.videoLink}
          onChange={handleChange}
          className="w-full border-8 border-black text-3xl p-4 bg-[#FFEB3B] text-black placeholder-black focus:outline-none focus:ring-8 focus:ring-black shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] transition-all hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
        />
      </div>

      <div className="mb-6">
        <label htmlFor="studyDuration" className="block text-4xl font-extrabold text-black mb-2">Çalışma Süresi (Saat)</label>
        <input
          id="studyDuration"
          name="studyDuration"
          type="number"
          value={formData.studyDuration}
          onChange={handleChange}
          className="w-full border-8 border-black text-3xl p-4 bg-[#FFEB3B] text-black placeholder-black focus:outline-none focus:ring-8 focus:ring-black shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] transition-all hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
          min="0"
          step="0.5"
          required
        />
      </div>

      <div className="mb-6">
        <label htmlFor="importantPoints" className="block text-4xl font-extrabold text-black mb-2">Önemli Noktalar</label>
        <textarea
          id="importantPoints"
          name="importantPoints"
          value={formData.importantPoints}
          onChange={handleChange}
          className="w-full border-8 border-black text-3xl p-4 bg-[#FFEB3B] text-black placeholder-black focus:outline-none focus:ring-8 focus:ring-black shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] transition-all hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
          rows={4}
        />
      </div>

      <button 
        type="submit" 
        className="w-full bg-[#FF6B6B] text-black border-8 border-black text-4xl font-extrabold py-6 hover:bg-[#FF3D3D] transition-colors shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:shadow-none"
      >
        KAYDET
      </button>
    </form>
  );
}