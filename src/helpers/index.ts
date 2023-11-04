import { validateLoginFormat, validateRegistrationFormat, validateEdits , validatePracticePlan } from './validate_user_data';

import { addUserAccount, updateUserProfile, deleteUserAccount,
         addPracticeData, updatePracticeData, updatePracticeDataByFields, deletePracticeData,
         getPracticeDataByDate, getPracticePiecesAndHoursByDate, getMostPracticedComposersByDate } from './touch_firestore_data';

import { convertToHours, convertToHoursAndMinutes, totalDurationInHoursAndMinutes, formatWeeklyDateRange,
         getDailyDateRanges, getWeeklyDateRanges, getMonthlyDateRanges, getOverallDateRanges } from './basic_calculations';


export { validateLoginFormat, validateRegistrationFormat, validateEdits, validatePracticePlan,
         addUserAccount, updateUserProfile, deleteUserAccount, addPracticeData, updatePracticeData, updatePracticeDataByFields, deletePracticeData,
         getPracticeDataByDate, getPracticePiecesAndHoursByDate, getMostPracticedComposersByDate,
         convertToHours, convertToHoursAndMinutes, totalDurationInHoursAndMinutes, formatWeeklyDateRange,
         getDailyDateRanges, getWeeklyDateRanges, getMonthlyDateRanges, getOverallDateRanges };
         