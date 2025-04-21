import { Alert } from "../domain/entities/alert";
import { InventoryItemRepository } from "../domain/repositories/inventory-item.repository";

export class GetLowStockAlerts {
  constructor(
    private inventoryRepo: InventoryItemRepository,
    private alertSender: (alert: Alert) => Promise<void>
  ) {}

  async execute(): Promise<void> {
    const items = await this.inventoryRepo.listAll();
    for (const item of items) {
      if (item.needsReorder()) {
        const alert = new Alert({
          productId: item.product.id,
          message: `Estoque baixo para ${item.product.name}`,
          type: "email",
          date: new Date(),
        });
        await this.alertSender(alert);
      }
    }
  }
}
