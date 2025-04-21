import { describe, it, expect, vi } from "vitest";
import { SetReorderLevel } from "./set-reorder-level";

const makeFakeInventoryRepo = () => ({
  listAll: vi.fn(),
  findByProductId: vi.fn(),
  save: vi.fn(),
});

describe("SetReorderLevel", () => {
  it("should update reorder level of an item", async () => {
    const fakeItem = { reorderLevel: 5 };

    const inventoryRepo = makeFakeInventoryRepo();
    inventoryRepo.findByProductId.mockResolvedValue(fakeItem);

    const useCase = new SetReorderLevel(
      inventoryRepo as any
    );

    await useCase.execute("1", 10);

    expect(fakeItem.reorderLevel).toBe(10);
    expect(inventoryRepo.save).toHaveBeenCalledWith(fakeItem);
  });

  it("should throw if product not found", async () => {
    const inventoryRepo = makeFakeInventoryRepo();
    inventoryRepo.findByProductId.mockResolvedValue(null);

    const useCase = new SetReorderLevel(
      inventoryRepo as any
    );

    await expect(useCase.execute("1", 10)).rejects.toThrow(
      "Produto nao encontrado"
    );
  });
});
