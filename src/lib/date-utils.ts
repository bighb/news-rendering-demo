// 统一的日期格式化工具函数，避免 hydration 问题

/**
 * 格式化日期为一致的字符串格式，避免服务端和客户端不一致
 * @param date - 日期字符串或 Date 对象
 * @param format - 格式类型：'date' | 'datetime' | 'relative'
 * @returns 格式化后的日期字符串
 */
export function formatDate(
  date: string | Date,
  format: "date" | "datetime" | "relative" = "date"
): string {
  const dateObj = typeof date === "string" ? new Date(date) : date;

  // 确保时区一致，使用 UTC 时间避免服务端客户端差异
  const year = dateObj.getUTCFullYear();
  const month = String(dateObj.getUTCMonth() + 1).padStart(2, "0");
  const day = String(dateObj.getUTCDate()).padStart(2, "0");
  const hours = String(dateObj.getUTCHours()).padStart(2, "0");
  const minutes = String(dateObj.getUTCMinutes()).padStart(2, "0");

  switch (format) {
    case "date":
      return `${year}-${month}-${day}`;
    case "datetime":
      return `${year}-${month}-${day} ${hours}:${minutes}`;
    case "relative":
      return getRelativeTime(dateObj);
    default:
      return `${year}-${month}-${day}`;
  }
}

/**
 * 获取相对时间描述
 */
function getRelativeTime(date: Date): string {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return "刚刚";
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `${minutes}分钟前`;
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `${hours}小时前`;
  } else if (diffInSeconds < 2592000) {
    const days = Math.floor(diffInSeconds / 86400);
    return `${days}天前`;
  } else {
    return formatDate(date, "date");
  }
}

/**
 * 格式化数字，添加千位分隔符
 */
export function formatNumber(num: number): string {
  return num.toLocaleString("zh-CN");
}
