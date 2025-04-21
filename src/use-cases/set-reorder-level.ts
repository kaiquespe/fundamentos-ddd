import { InventoryItemRepository } from "../domain/repositories/inventory-item.repository";

export class SetReorderLevel {
  constructor(private repo: InventoryItemRepository) {}

  async execute(productId: string, newLevel: number): Promise<void> {
    const item = await this.repo.findByProductId(productId);
    if (!item) throw new Error("Produto nao encontrado");
    item.reorderLevel = newLevel;
    await this.repo.save(item);
  }
}
