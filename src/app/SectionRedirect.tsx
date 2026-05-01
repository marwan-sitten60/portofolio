'use client';

import { useEffect } from 'react';

const githubPagesBasePaths = ['/portofolio', '/revil'];

type SectionRedirectProps = {
  section: 'projects' | 'stack';
  label: string;
};

const getBasePath = () => {
  const path = window.location.pathname.replace(/\/$/, '');

  return githubPagesBasePaths.find((basePath) => (
    path === basePath || path.startsWith(`${basePath}/`)
  )) || '';
};

export default function SectionRedirect({ section, label }: SectionRedirectProps) {
  useEffect(() => {
    const basePath = getBasePath();
    window.location.replace(`${basePath}/#${section}`);
  }, [section]);

  return <a href={`/#${section}`}>{label}</a>;
}
