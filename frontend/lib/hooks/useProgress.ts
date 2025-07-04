import { useState, useEffect } from "react";

export function useProgress(userId: string, courseId: string) {
  const [completedUnits, setCompletedUnits] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!userId || !courseId) return;

    setLoading(true);
    fetch(`/api/progress/course/${courseId}?userId=${userId}`)
      .then(res => res.json())
      .then(data => {
        const unitIds = data.map((item: any) => item.unitId) || [];
        setCompletedUnits(unitIds);
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

  return { completedUnits, toggleUnit, loading };
} 