import { useAppDispatch, useAppSelector } from "../store/configureStore";


export default function useSurgeryFollowUp() {
    const dispatch = useAppDispatch();
    const {metaData, surgeryFollowUpByCardiologySurgeryLodaded} = useAppSelector((state) => state.surgeryFollowUp);


  return {
    dispatch,
    metaData,
    surgeryFollowUpByCardiologySurgeryLodaded,
  }
}
