/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import HeroSection from './components/HeroSection';
import StartAProject from './components/StartAProject';

export default function App() {
  const getInitialPath = () => {
    if (typeof window !== 'undefined') {
      const pathname = window.location.pathname.toLowerCase().replace(/\/$/, '');
      if (pathname === '/start-a-project') {
        return '/start-a-project';
      }
    }
    return '/';
  };

  const [currentPath, setCurrentPath] = useState<string>(getInitialPath);
  const [targetTab, setTargetTab] = useState<'reel' | 'projects' | 'skills' | 'profile'>('reel');

  useEffect(() => {
    const handlePopState = () => {
      const pathname = window.location.pathname.toLowerCase().replace(/\/$/, '');
      if (pathname === '/start-a-project') {
        setCurrentPath('/start-a-project');
      } else {
        setCurrentPath('/');
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleNavigate = (path: string, tab?: 'reel' | 'projects' | 'skills' | 'profile') => {
    const normalizedPath = path.toLowerCase().replace(/\/$/, '') || '/';
    if (tab) {
      setTargetTab(tab);
    }
    
    if (window.location.pathname !== normalizedPath) {
      window.history.pushState({}, '', normalizedPath);
    }
    setCurrentPath(normalizedPath);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (currentPath === '/start-a-project') {
    return <StartAProject onNavigate={handleNavigate} />;
  }

  return <HeroSection initialTab={targetTab} onNavigate={handleNavigate} />;
}
