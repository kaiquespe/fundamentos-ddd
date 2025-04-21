import { describe, it, expect, vi, beforeEach } from "vitest";
import { GetLowStockAlerts } from "./get-low-stock-alerts";
import { Alert } from "../domain/entities/alert";

function makeFakeInventoryRepo() {
  return {
    listAll: vi.fn<() => Promise<any[]>>(),
    findByProductId: vi.fn(),
    save: vi.fn(),
  };
}

describe("GetLowStockAlerts", () => {
  let inventoryRepo: ReturnType<typeof makeFakeInventoryRepo>;
  let alertSender: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    inventoryRepo = makeFakeInventoryRepo();
    alertSender = vi.fn<(alert: any) => Promise<void>>();
  });

  it("should send an alert when item needs reorder", async () => {
    const fakeItem = {
      product: { id: "1", name: "Produto Teste" },
      needsReorder: () => true,
    };
    inventoryRepo.listAll.mockResolvedValue([fakeItem]);

    const useCase = new GetLowStockAlerts(inventoryRepo as any, alertSender);

    await useCase.execute();

    expect(alertSender).toHaveBeenCalledTimes(1);
    const alertArg = alertSender.mock.calls[0][0] as Alert;
    expect(alertArg).toBeInstanceOf(Alert);
    expect(alertArg.productId).toBe("1");
    expect(alertArg.message).toBe("Estoque baixo para Produto Teste");
    expect(alertArg.type).toBe("email");
    expect(alertArg.date).toBeInstanceOf(Date);
  });

  it("should not send alert when no items need reorder", async () => {
    const fakeItem = {
      product: { id: "1", name: "Produto Teste" },
      needsReorder: () => false,
    };
    inventoryRepo.listAll.mockResolvedValue([fakeItem]);

    const useCase = new GetLowStockAlerts(inventoryRepo as any, alertSender);

    await useCase.execute();

    expect(alertSender).not.toHaveBeenCalled();
  });
});
