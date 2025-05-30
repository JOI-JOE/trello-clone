// Import thư viện zod để kiểm tra dữ liệu
import { z } from "zod";

// Định nghĩa kiểu dữ liệu cho lỗi từng field (nếu có)
// Ví dụ: { title: ["Tiêu đề bắt buộc"], description: ["Mô tả quá ngắn"] }
export type FieldErrors<T> = {
  [K in keyof T]?: string[];
};

// Định nghĩa kiểu dữ liệu trả về của action
// Có thể chứa lỗi từng field, lỗi chung hoặc dữ liệu trả về thành công
export type ActionState<TInput, TOutput> = {
  fieldErrors?: FieldErrors<TInput>; // lỗi từng field (do validation)
  error?: string | null; // lỗi chung (như database lỗi)
  data?: TOutput; // dữ liệu trả về nếu thành công
};

// Hàm tạo một "safe action" (action an toàn)
// - Kiểm tra dữ liệu với zod schema
// - Nếu hợp lệ thì gọi handler xử lý
// - Nếu không hợp lệ thì trả lỗi rõ ràng
export const createSafeAction = <TInput, TOutput>(
  schema: z.Schema<TInput>, // Schema kiểm tra input đầu vào
  handler: (validatedData: TInput) => Promise<ActionState<TInput, TOutput>> // Hàm xử lý chính
) => {
  // Trả về một hàm async nhận dữ liệu đầu vào
  return async (data: TInput): Promise<ActionState<TInput, TOutput>> => {
    // Kiểm tra dữ liệu bằng schema
    const validationResult = schema.safeParse(data);

    // Nếu dữ liệu không hợp lệ, trả về lỗi từng field
    if (!validationResult.success) {
      return {
        fieldErrors: validationResult.error.flatten()
          .fieldErrors as FieldErrors<TInput>,
      };
    }

    // Nếu hợp lệ, gọi handler để xử lý và trả về kết quả
    return handler(validationResult.data);
  };
};
