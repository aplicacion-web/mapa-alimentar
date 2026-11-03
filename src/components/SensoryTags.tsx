import React from 'react';

interface SensoryTagsProps {
  textures?: string[];
  colors?: string[];
  shapes?: string[];
  temperatures?: string[];
  size?: 'sm' | 'md';
}

export const SensoryTags: React.FC<SensoryTagsProps> = ({
  textures = [],
  colors = [],
  shapes = [],
  temperatures = [],
  size = 'sm'
}) => {
  const badgeClasses = size === 'sm' 
    ? 'text-[10px] px-2 py-0.5 rounded-md font-medium'
    : 'text-xs px-2.5 py-1 rounded-lg font-medium';

  return (
    <div className="flex flex-wrap gap-1.5 items-center">
      {textures.map(t => (
        <span 
          key={'tex-' + t} 
          className={`${badgeClasses} bg-teal-50 text-teal-700 border border-teal-200/60`}
          title={`Textura: ${t}`}
        >
          {t}
        </span>
      ))}
      {colors.map(c => (
        <span 
          key={'col-' + c} 
          className={`${badgeClasses} bg-amber-50 text-amber-700 border border-amber-200/60`}
          title={`Color: ${c}`}
        >
          {c}
        </span>
      ))}
      {shapes.map(s => (
        <span 
          key={'sha-' + s} 
          className={`${badgeClasses} bg-sky-50 text-sky-700 border border-sky-200/60`}
          title={`Forma: ${s}`}
        >
          {s}
        </span>
      ))}
      {temperatures.map(tmp => (
        <span 
          key={'tmp-' + tmp} 
          className={`${badgeClasses} bg-rose-50 text-rose-700 border border-rose-200/60`}
          title={`Temperatura: ${tmp}`}
        >
          {tmp}
        </span>
      ))}
    </div>
  );
};
