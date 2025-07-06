import { useState, useEffect } from "react";

export function useProgress(userId: string, courseId: string) {
  const [completedUnits, setCompletedUnits] = useState<string[]>([]);
  const [completedNanos, setCompletedNanos] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!userId || !courseId) return;

    setLoading(true);
    fetch(`/api/progress/course/${courseId}?userId=${userId}`)
      .then(res => res.json())
      .then(data => {
        const unitIds = data.map((item: { unitId: string }) => item.unitId) || [];
        setCompletedUnits(unitIds);
        
        // Beregn completed nanos basert på completed units
        const nanoProgress = data.reduce((acc: Record<string, { completed: number; total: number }>, item: { nanoId: string }) => {
          if (!acc[item.nanoId]) {
            acc[item.nanoId] = { completed: 0, total: 0 };
          }
          acc[item.nanoId].completed++;
          return acc;
        }, {});
        
        // En nano er fullført hvis alle units er fullført
        const completedNanoIds = Object.keys(nanoProgress).filter(nanoId => {
          // Vi trenger å vite total antall units per nano - dette må hentes fra course data
          return nanoProgress[nanoId].completed > 0; // Midlertidig: hvis minst 1 unit er fullført
        });
        
        setCompletedNanos(completedNanoIds);
      })
      .catch(error => {
        console.error('Error fetching progress:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [userId, courseId]);

  const toggleUnit = async (unitId: string, nanoId?: string) => {
    const isCompleted = completedUnits.includes(unitId);
    const method = isCompleted ? "DELETE" : "POST";

    try {
      const response = await fetch(`/api/progress/unit/${unitId}?userId=${userId}`, { 
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: method === 'POST' ? JSON.stringify({
          userId,
          courseId,
          nanoId: nanoId || 'default',
          unitId
        }) : JSON.stringify({
          userId
        })
      });

      if (response.ok) {
        setCompletedUnits(prev =>
          isCompleted ? prev.filter(id => id !== unitId) : [...prev, unitId]
        );
      } else {
        console.error('Failed to toggle unit progress');
      }
    } catch (error) {
      console.error('Error toggling unit progress:', error);
    }
  };

  const getNextUnit = (currentUnitId: string, units: Array<{ id: string }>, nanos: Array<{ id: string; units: Array<{ id: string }> }>) => {
    // Finn hvilken nano og unit vi er i
    let currentNanoIndex = -1;
    let currentUnitIndex = -1;
    
    for (let nanoIndex = 0; nanoIndex < nanos.length; nanoIndex++) {
      const nano = nanos[nanoIndex];
      const unitIndex = nano.units.findIndex((unit: { id: string }) => unit.id === currentUnitId);
      if (unitIndex !== -1) {
        currentNanoIndex = nanoIndex;
        currentUnitIndex = unitIndex;
        break;
      }
    }
    
    if (currentNanoIndex === -1 || currentUnitIndex === -1) return null;
    
    const currentNano = nanos[currentNanoIndex];
    
    // Sjekk om det er flere units i denne nanoen
    if (currentUnitIndex < currentNano.units.length - 1) {
      return {
        type: 'unit',
        nanoId: currentNano.id,
        unitId: currentNano.units[currentUnitIndex + 1].id,
        nanoIndex: currentNanoIndex,
        unitIndex: currentUnitIndex + 1
      };
    }
    
    // Sjekk om det er flere nanos
    if (currentNanoIndex < nanos.length - 1) {
      const nextNano = nanos[currentNanoIndex + 1];
      if (nextNano.units.length > 0) {
        return {
          type: 'nano',
          nanoId: nextNano.id,
          unitId: nextNano.units[0].id,
          nanoIndex: currentNanoIndex + 1,
          unitIndex: 0
        };
      }
    }
    
    // Kurset er ferdig
    return { type: 'completed' };
  };

  const completeAndNext = async (currentUnitId: string, units: Array<{ id: string }>, nanos: Array<{ id: string; units: Array<{ id: string }> }>) => {
    // Marker som fullført hvis ikke allerede
    if (!completedUnits.includes(currentUnitId)) {
      await toggleUnit(currentUnitId);
    }
    
    return getNextUnit(currentUnitId, units, nanos);
  };

  const calculateNanoProgress = (nanoId: string, allNanos: Array<{ id: string; units?: Array<{ id: string }> }>) => {
    const nano = allNanos.find((n: { id: string; units?: Array<{ id: string }> }) => n.id === nanoId);
    if (!nano || !nano.units) return { completed: 0, total: 0, percentage: 0 };
    
    const totalUnits = nano.units.length;
    const completedUnitsInNano = nano.units.filter((unit: { id: string }) => 
      completedUnits.includes(unit.id)
    ).length;
    
    return {
      completed: completedUnitsInNano,
      total: totalUnits,
      percentage: totalUnits > 0 ? Math.round((completedUnitsInNano / totalUnits) * 100) : 0
    };
  };

  const isNanoCompleted = (nanoId: string, allNanos: Array<{ id: string; units?: Array<{ id: string }> }>) => {
    const progress = calculateNanoProgress(nanoId, allNanos);
    return progress.completed === progress.total && progress.total > 0;
  };

  return { 
    completedUnits, 
    completedNanos,
    toggleUnit, 
    loading, 
    getNextUnit, 
    completeAndNext,
    calculateNanoProgress,
    isNanoCompleted
  };
} 