import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { ExperienceStatus } from '../../data/types';
import { History, Plus, CheckCircle2, Eye, XCircle, Slash, Download, Sparkles, Check } from 'lucide-react';
import { DisclaimerBanner } from '../../components/DisclaimerBanner';

export const HistoryPage: React.FC = () => {
  const { experiences, catalog, addExperience, child } = useData();

  const [isLogging, setIsLogging] = useState(false);
  const [selectedFoodId, setSelectedFoodId] = useState<string>(catalog[0]?.id || '');
  const [status, setStatus] = useState<ExperienceStatus>('accepted');
  const [notes, setNotes] = useState('');
  const [feedback, setFeedback] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFoodId) return;

    addExperience(selectedFoodId, status, notes.trim());
    setNotes('');
    setIsLogging(false);
    setFeedback(true);
    setTimeout(() => setFeedback(false), 2000);
  };

  const handleExport = () => {
    const textLines = [
      `HISTORIAL DE EXPERIENCIAS - MAPA ALIMENTAR`,
      `Menor: ${child.nickname} (${child.ageBand} años)`,
      `Fecha de exportación: ${new Date().toLocaleDateString('es-MX')}`,
      `---------------------------------------------`,
      ...experiences.map(exp => {
        const food = catalog.find(f => f.id === exp.foodId);
        return `[${exp.occurredAt}] ${food?.nameEsMx || 'Alimento'} -> ${exp.status.toUpperCase()}${exp.notes ? ` ("${exp.notes}")` : ''}`;
      })
    ];

    const blob = new Blob([textLines.join('\n')], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `historial_${child.nickname.toLowerCase()}_${new Date().toISOString().slice(0, 10)}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const getStatusBadge = (st: ExperienceStatus) => {
    switch (st) {
      case 'accepted':
        return {
          label: 'Aceptó comer',
          color: 'bg-emerald-50 text-emerald-800 border-emerald-200',
          icon: CheckCircle2
        };
      case 'explored':
        return {
          label: 'Exploró / Tocó / Olió',
          color: 'bg-amber-50 text-amber-800 border-amber-200',
          icon: Eye
        };
      case 'refused':
        return {
          label: 'Rechazó (respetado)',
          color: 'bg-rose-50 text-rose-800 border-rose-200',
          icon: XCircle
        };
      case 'not_offered':
        return {
          label: 'No ofrecido hoy',
          color: 'bg-slate-50 text-slate-600 border-slate-200',
          icon: Slash
        };
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-4 space-y-4 pb-24">
      {/* Title */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-black text-slate-900 tracking-tight">Historial de Exposición</h2>
          <p className="text-xs text-slate-500">
            Bitácora respetuosa de tolerancia para <strong className="text-slate-700">{child.nickname}</strong>
          </p>
        </div>
        <button
          onClick={() => setIsLogging(!isLogging)}
          className="bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold px-3 py-1.5 rounded-xl flex items-center gap-1 shadow-sm transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Registrar comida</span>
        </button>
      </div>

      {feedback && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-2xl flex items-center gap-2 font-medium">
          <Check className="w-4 h-4 text-emerald-600" />
          <span>Registro guardado con éxito. ¡Cada intento cuenta!</span>
        </div>
      )}

      {/* Log Form */}
      {isLogging && (
        <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-4 border border-brand-200 shadow-md space-y-3 text-xs animate-in fade-in duration-150">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <h4 className="font-bold text-slate-900">Registrar experiencia con un alimento</h4>
            <button
              type="button"
              onClick={() => setIsLogging(false)}
              className="text-slate-400 hover:text-slate-600 font-bold"
            >
              Cerrar
            </button>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Alimento ofrecido:</label>
            <select
              value={selectedFoodId}
              onChange={(e) => setSelectedFoodId(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 font-medium outline-none"
            >
              {catalog.map(food => (
                <option key={food.id} value={food.id}>
                  {food.nameEsMx} ({food.category})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">¿Cómo fue la respuesta del pequeño?:</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setStatus('accepted')}
                className={`p-2 rounded-xl text-left font-bold transition-all flex items-center gap-2 ${
                  status === 'accepted' ? 'bg-emerald-600 text-white' : 'bg-slate-50 text-slate-700 hover:bg-emerald-50'
                }`}
              >
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Aceptó comer</span>
              </button>

              <button
                type="button"
                onClick={() => setStatus('explored')}
                className={`p-2 rounded-xl text-left font-bold transition-all flex items-center gap-2 ${
                  status === 'explored' ? 'bg-amber-500 text-white' : 'bg-slate-50 text-slate-700 hover:bg-amber-50'
                }`}
              >
                <Eye className="w-4 h-4 shrink-0" />
                <span>Exploró / Tocó</span>
              </button>

              <button
                type="button"
                onClick={() => setStatus('refused')}
                className={`p-2 rounded-xl text-left font-bold transition-all flex items-center gap-2 ${
                  status === 'refused' ? 'bg-rose-600 text-white' : 'bg-slate-50 text-slate-700 hover:bg-rose-50'
                }`}
              >
                <XCircle className="w-4 h-4 shrink-0" />
                <span>Rechazó</span>
              </button>

              <button
                type="button"
                onClick={() => setStatus('not_offered')}
                className={`p-2 rounded-xl text-left font-bold transition-all flex items-center gap-2 ${
                  status === 'not_offered' ? 'bg-slate-600 text-white' : 'bg-slate-50 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <Slash className="w-4 h-4 shrink-0" />
                <span>No ofrecido</span>
              </button>
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Observación (opcional):</label>
            <input
              type="text"
              placeholder="Ej. Lo olió con curiosidad pero prefirió no probarlo hoy"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 outline-none text-xs"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-brand-600 hover:bg-brand-700 text-white font-bold py-2.5 rounded-xl shadow-sm"
          >
            Guardar en el historial
          </button>
        </form>
      )}

      {/* Wireframe 05 List */}
      <div className="bg-white rounded-3xl p-4 border border-slate-200/90 shadow-sm space-y-3">
        <div className="flex items-center justify-between border-b border-slate-100 pb-2">
          <h3 className="text-sm font-bold text-slate-900">Registros de interacción</h3>
          <button
            onClick={handleExport}
            className="text-xs text-brand-700 hover:text-brand-900 font-semibold flex items-center gap-1"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Exportar resumen</span>
          </button>
        </div>

        <div className="space-y-2.5">
          {experiences.map((exp) => {
            const food = catalog.find(f => f.id === exp.foodId);
            if (!food) return null;
            const badge = getStatusBadge(exp.status);
            const Icon = badge.icon;

            return (
              <div
                key={exp.id}
                className="bg-slate-50/70 p-3 rounded-2xl border border-slate-200/70 flex items-start justify-between gap-3 text-xs"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 text-sm">{food.nameEsMx}</span>
                    <span className="text-[10px] text-slate-400">· {exp.occurredAt}</span>
                  </div>
                  {exp.notes && (
                    <p className="text-[11px] text-slate-600 leading-snug italic">
                      "{exp.notes}"
                    </p>
                  )}
                  <p className="text-[10px] text-slate-400 capitalize">
                    {food.category} · {food.textureTags[0]}
                  </p>
                </div>

                <div className={`px-2.5 py-1 rounded-xl border flex items-center gap-1.5 shrink-0 ${badge.color}`}>
                  <Icon className="w-3.5 h-3.5" />
                  <span className="text-[10px] font-bold">{badge.label}</span>
                </div>
              </div>
            );
          })}

          {experiences.length === 0 && (
            <p className="text-xs text-slate-500 text-center py-4">
              Aún no hay registros de comidas. Toca "Registrar comida" para comenzar.
            </p>
          )}
        </div>
      </div>

      <DisclaimerBanner compact />
    </div>
  );
};
