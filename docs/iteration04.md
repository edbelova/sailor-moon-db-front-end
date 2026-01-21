# Item Form API Integration Plan

Goal: Wire the item creation form to a (currently mock) create-item API using React Query and Zustand, so the Save action persists a new item and updates the items list.

## Proposed steps
1. **Align data model + payload shape**
   - Review `src/features/items/types.ts` and the form fields to define a consistent `CreateItemInput` shape.
   - Decide how to normalize fields (e.g., `characters`/`materials` as comma‑separated input → `string[]`, `price` as number, `country` → `countryOfOrigin`).
   - Add lightweight validation rules in `src/features/items/components/ItemForm/validation.ts` (required fields, numeric checks, date format if needed).

2. **Centralize form state with Zustand**
   - Create a small store (e.g., `useItemFormStore`) to hold the draft values and update handlers so the three sub‑forms share state.
   - Expose helpers for reset and for producing a validated payload for submission.

3. **Create API + React Query mutation**
   - Implement `src/features/items/api/createItem.ts` (mock delay + return created item with generated id) until a real endpoint exists.
   - Implement `src/features/items/queries/useCreateItem.ts` using `useMutation`.
   - On success, invalidate `itemQueryKeys.all` (and category‑specific keys) so the item list refreshes.

4. **Wire up ItemForm + actions**
   - Connect `ItemDetailsForm`, `ItemDescriptionForm`, and `ItemImagesForm` to the shared store.
   - Update `ItemFormActions` to call the mutation on Save; disable buttons while pending; surface errors.
   - Include `categoryId` from the category UI store in the payload.

5. **UX polish + verification**
   - Add basic error text and required field indicators.
   - Reset the form on successful create.
   - Manually verify: create item → items list updates for selected category.

## Files likely to change
- `src/features/items/components/ItemForm/ItemForm.tsx`
- `src/features/items/components/ItemFormActions/ItemFormActions.tsx`
- `src/features/items/components/ItemDetailsForm/ItemDetailsForm.tsx`
- `src/features/items/components/ItemDescriptionForm/ItemDescriptionForm.tsx`
- `src/features/items/components/ItemImagesForm/ItemImagesForm.tsx`
- `src/features/items/components/ItemForm/validation.ts`
- `src/features/items/components/ItemForm/types.ts`
- `src/features/items/api/createItem.ts`
- `src/features/items/queries/useCreateItem.ts`
- `src/features/items/queries/useItemsByCategory.ts` (only if query keys need expansion)

## Open questions
- Items must be created only when a **child category** is selected (not parent).
- Required fields: `name` and `categoryId` only; images are optional.
- Save should wait for server confirmation (no optimistic create).
