"use client"
import React, { useState, useCallback } from 'react';
import { Node, Edge } from '@reactflow/core';
import { setGeneratedData } from '@/store/features/mindmapSlice';
import { useDispatch } from 'react-redux';

export default function MapPage() {
    const dispatch = useDispatch();



    return (
        <div style={{
            width: '100vw',
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#E8ECEE'
        }}>
        </div>
    );
}
