/**
 * コンポーネントの props を定義する型
 */
type Props = {
  /**
   * 画像の URL
   */
  src: string;
  /**
   * 画像のダークモードの URL
   */
  srcDark: string;
  /**
   * 画像のタイトル
   */
  title: string;
  /**
   * ダークモードかどうか
   */
  isDarkMode: boolean;
};

/**
 * グローバルナビゲーションを構成するコンポーネント
 */
export const StudyButton: React.FC<Props> = ({
  src,
  srcDark,
  title,
  isDarkMode,
}) => {
  return (
    <div
      className={`mb-[4.16px] ml-[4.16px] mr-[4.16px] flex w-[70px] flex-col items-center justify-center rounded-[5px] border ${isDarkMode ? "border-[#484848] bg-[#212121]" : "border-[#f6f6f6] bg-white"}`}
    >
      {isDarkMode ? (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={srcDark} alt={title} width={40} className="mt-[5px]" />
        </>
      ) : (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} alt={title} width={40} className="mt-[5px]" />
        </>
      )}
      <p
        className={`mb-[5px] mt-[5px] text-[11px] ${isDarkMode ? "text-[#a0a0a0]" : "text-[#4f4f4f]"}`}
      >
        {title}
      </p>
    </div>
  );
};
