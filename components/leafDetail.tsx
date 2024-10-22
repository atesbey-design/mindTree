import React, { useState } from 'react';

interface LeafDetailProps {
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

const LeafDetail: React.FC<LeafDetailProps> = ({ onSave }) => {
  const [formData, setFormData] = useState<LeafDetailData>({
    title: '',
    description: '',
    studySource: '',
    solvedProblems: '',
    videoLink: '',
    studyDuration: 0,
    importantPoints: '',
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
    <form onSubmit={handleSubmit} className="space-y-8 p-8 bg-[#FF6B6B] border-8 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] rounded-none">
      <div>
        <label htmlFor="title" className="block text-3xl font-extrabold text-black mb-2">Konu Başlığı</label>
        <input
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="w-full border-4 border-black text-2xl p-3 bg-[#4ECDC4] placeholder-black::placeholder focus:outline-none focus:ring-4 focus:ring-black"
          required
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-3xl font-extrabold text-black mb-2">Açıklama</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full border-4 border-black text-2xl p-3 bg-[#4ECDC4] placeholder-black::placeholder focus:outline-none focus:ring-4 focus:ring-black"
          rows={3}
          required
        />
      </div>

      <div>
        <label htmlFor="studySource" className="block text-3xl font-extrabold text-black mb-2">Çalışma Kaynağı</label>
        <input
          id="studySource"
          name="studySource"
          value={formData.studySource}
          onChange={handleChange}
          className="w-full border-4 border-black text-2xl p-3 bg-[#4ECDC4] placeholder-black::placeholder focus:outline-none focus:ring-4 focus:ring-black"
          required
        />
      </div>

      <div>
        <label htmlFor="solvedProblems" className="block text-3xl font-extrabold text-black mb-2">Çözülen Problemler</label>
        <textarea
          id="solvedProblems"
          name="solvedProblems"
          value={formData.solvedProblems}
          onChange={handleChange}
          className="w-full border-4 border-black text-2xl p-3 bg-[#4ECDC4] placeholder-black::placeholder focus:outline-none focus:ring-4 focus:ring-black"
          rows={3}
        />
      </div>

      <div>
        <label htmlFor="videoLink" className="block text-3xl font-extrabold text-black mb-2">Video Linki</label>
        <input
          id="videoLink"
          name="videoLink"
          type="url"
          value={formData.videoLink}
          onChange={handleChange}
          className="w-full border-4 border-black text-2xl p-3 bg-[#4ECDC4] placeholder-black::placeholder focus:outline-none focus:ring-4 focus:ring-black"
        />
      </div>

      <div>
        <label htmlFor="studyDuration" className="block text-3xl font-extrabold text-black mb-2">Çalışma Süresi (Saat)</label>
        <input
          id="studyDuration"
          name="studyDuration"
          type="number"
          value={formData.studyDuration}
          onChange={handleChange}
          className="w-full border-4 border-black text-2xl p-3 bg-[#4ECDC4] placeholder-black::placeholder focus:outline-none focus:ring-4 focus:ring-black"
          min="0"
          step="0.5"
          required
        />
      </div>

      <div>
        <label htmlFor="importantPoints" className="block text-3xl font-extrabold text-black mb-2">Önemli Noktalar</label>
        <textarea
          id="importantPoints"
          name="importantPoints"
          value={formData.importantPoints}
          onChange={handleChange}
          className="w-full border-4 border-black text-2xl p-3 bg-[#4ECDC4] placeholder-black::placeholder focus:outline-none focus:ring-4 focus:ring-black"
          rows={4}
        />
      </div>

      <button 
        type="submit" 
        className="w-full bg-[#FFD93D] text-black border-8 border-black text-3xl font-extrabold py-4 hover:bg-[#FFC300] transition-colors shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none"
      >
        KAYDET
      </button>
    </form>
  );
};

export default LeafDetail;
