import { useEffect, useMemo, useRef } from "react";
import { useLocation } from "react-router-dom";
import StatusEnum from "../../shared/enum/status.enum";
import checkPay from "../../api/services/getServices";
import Loader from "../../shared/components/Loader/Loader";
import useGlobalStore from "../../store/global";
import statusEnum from "../../shared/enum/status.enum";
import StatusFail from "./StatusFail/StatusFail";
import StatusSuccess from "./StatusSuccess/StatusSuccess";

const Status = () => {
  const status = useGlobalStore(({ status }) => status);
  const location = useLocation();
  const timerRef = useRef<number | null>(null);

  const pid = useMemo(
    () => new URLSearchParams(location.search).get("pid"),
    [location.search]
  );

  useEffect(() => {
    let isMounted = true;
    const checkPayment = async () => {
      const result = await checkPay(pid);
      const resultStatus = result.status ?? StatusEnum.fail;
      if (!isMounted) return;
      if (resultStatus === StatusEnum.process) {
        timerRef.current = setTimeout(checkPayment, 1000);
      } else {
        useGlobalStore.getState().setStatus(resultStatus);
      }
    };
    timerRef.current = setTimeout(checkPayment, 1000);

    return () => {
      isMounted = false;
      clearTimeout(timerRef.current);
      useGlobalStore.getState().setStatus(statusEnum.process);
    };
  }, [pid]);

  return (
    <div className="flex items-center justify-center h-[245px] w-full">
      {StatusEnum.process === status && <Loader />}
      {StatusEnum.ok === status && <StatusSuccess />}
      {StatusEnum.fail === status && <StatusFail />}
    </div>
  );
};

export default Status;
