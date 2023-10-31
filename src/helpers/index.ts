import { validateLoginFormat, validateRegistrationFormat, validateEdits , validatePracticePlan } from './validate_user_data';
import { addUserAccount, updateUserProfile, deleteUserAccount,
         addPracticeData, updatePracticeData, deletePracticeData,
         getPracticeDataByDate, getPracticePiecesAndHoursByDate, getMostPracticedComposersByDate } from './touch_firestore_data';


export { validateLoginFormat, validateRegistrationFormat, validateEdits, validatePracticePlan,
         addUserAccount, updateUserProfile, deleteUserAccount, addPracticeData, updatePracticeData, deletePracticeData,
         getPracticeDataByDate, getPracticePiecesAndHoursByDate, getMostPracticedComposersByDate };
         