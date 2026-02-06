# Spacing System

Dette prosjektet bruker et konsistent spacing-system basert på Tailwind CSS utilities:

## Spacing Hierarchy

### `space-y-6` (24px)
- **Bruk:** Page-level hovedcontainere
- **Eksempel:** Spacing mellom hovedseksjoner på en side
- **Filer:** Alle `page.tsx` filer med `animate-fade-in` containere

### `space-y-4` (16px)
- **Bruk:** Form fields og input groups
- **Eksempel:** Mellom input-felter i forms
- **Filer:** Bestill-forms, innstillinger, order detail forms

### `space-y-2` (8px) eller `mb-2`
- **Bruk:** List items, cards i lister, menu-elementer
- **Eksempel:** Mellom order cards, equipment items, calendar entries
- **Filer:** Alle liste-visninger (dashboard, kalender, ordrer, etc.)

### `space-y-1` (4px)
- **Bruk:** Tett-grupperte elementer (label/value par)
- **Eksempel:** Label og verdi i en info-boks
- **Filer:** Order details, customer info sections

## Card Spacing

### Mellom Cards
- **Main sections:** `mb-8` (32px) eller parent container med `space-y-6` (24px)
- **List items:** `mb-2` (8px)

### Inne i Cards
- **Header margin:** `mb-4` (16px)
- **Section padding:** `p-4`, `p-5`, eller `p-6` avhengig av context
- **Internal elements:** `space-y-2` (8px) for lister, `space-y-4` (16px) for forms

## Implementation Notes

- Bruk `space-y-*` på parent container når alle children skal ha lik spacing
- Bruk `mb-*` direkte på element når du trenger individuell kontroll
- For `<Link>` elements i lister: legg til `className="block mb-2"` på `<Link>` selv
