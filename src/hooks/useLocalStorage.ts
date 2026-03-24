import { useState, useEffect } from "react";

function useLocalStorage<T>(key: string, initialValue: T) {
  // Khởi tạo state
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === "undefined") {
      return initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);
      // Nếu có giá trị trong localStorage thì parse, ngược lại dùng initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`Lỗi khi đọc key "${key}" từ localStorage:`, error);
      return initialValue;
    }
  });

  // Cập nhật localStorage mỗi khi key hoặc storedValue thay đổi
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        window.localStorage.setItem(key, JSON.stringify(storedValue));
      } catch (error) {
        console.warn(`Lỗi khi lưu key "${key}" vào localStorage:`, error);
      }
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue] as const;
}

export default useLocalStorage;
