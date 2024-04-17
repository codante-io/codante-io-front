function SoonChip() {
  return (
    <div className="absolute right-4 top-4 bg-background-50  dark:bg-background-700 rounded-lg">
      <div className="px-2 py-1 backdrop-blur-sm border bg-brand-300/10 border-brand-500/20 text-white mx-auto text-center rounded-lg relative ">
        <span className="text-sm text-blue-600 dark:text-blue-300">
          Em breve
        </span>
        <div className="absolute inset-x-0 h-px -bottom-px bg-gradient-to-r w-3/4 mx-auto from-transparent via-brand-500 to-transparent" />
      </div>
    </div>
  );
}

export default SoonChip;
