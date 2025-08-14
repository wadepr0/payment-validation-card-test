const StatusFail = () => (
  <div className="text-[26px] font-[600]">
    <div className="w-24 h-24 flex justify center items center m-auto">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="100"
        height="100"
        viewBox="0 0 100 100"
      >
        <line
          x1="20"
          y1="20"
          x2="80"
          y2="80"
          stroke="red"
          strokeWidth="10"
          strokeLinecap="round"
        />
        <line
          x1="80"
          y1="20"
          x2="20"
          y2="80"
          stroke="red"
          strokeWidth="10"
          strokeLinecap="round"
        />
      </svg>
    </div>
    Произошла ошибка
  </div>
);

export default StatusFail;
