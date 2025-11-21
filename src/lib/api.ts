const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export interface Prediction {
  model_status: string
  predicted_class_id: number
  predicted_label: string
  grade_recommendation: 'same' | 'more'
  recommendations: {
    attendance?: number
    participation_score?: number
    study_hours_per_week?: number
    stress_level?: number
    sleep_hours_per_night?: number
  }
}

interface Features {
    attendance: number
    participationScore: number
    sleepHoursPerNight: number
    stressLevel: number
    studyHours: number
    desiredGrade: number
}

export async function predictGrade(features: Features): Promise<Prediction> {
  const endpoint = `${API_BASE_URL}/predict/`;

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "attendance": features.attendance,
        "participation_score": features.participationScore,
        "study_hours_per_week": features.studyHours,
        "stress_level": features.stressLevel,
        "sleep_hours_per_night": features.sleepHoursPerNight,
        "target_grade": features.desiredGrade,
      }), 
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    const data = await response.json() as Prediction;
    return {
        ...data,
        grade_recommendation: data.predicted_class_id > features.desiredGrade
            ? 'more'
            : 'same',
    };

  } catch (error) {
    console.error("API Request Failed:", error);
    throw error;
  }
}