# Tint & Shade Generator - Design Guidelines

## Design Approach
**Reference-Based Approach**: Matching thecolorcodeconverter.com and colorpalettetester.com aesthetic - clean, professional utility tools with generous whitespace, subtle polish, and minimal distractions. The design prioritizes clarity, efficiency, and professional presentation.

## Core Design Principles
1. **Maximum Clarity**: Every element serves the color generation workflow
2. **Generous Whitespace**: Let the color swatches breathe and command attention
3. **Subtle Polish**: Refined but never decorative - shadows and borders are functional
4. **Accessibility First**: High contrast, large touch targets, semantic structure

## Typography System

**Font Family**: Inter (Google Fonts)
- Primary: Inter, sans-serif for all text
- Weights: 400 (Regular), 500 (Medium), 600 (Semi-bold), 700 (Bold)

**Type Scale**:
- Hero H1: text-5xl md:text-6xl font-bold (60-72px)
- Section H2: text-3xl md:text-4xl font-bold (36-48px)
- Card Titles: text-xl font-semibold (20px)
- Body Text: text-base (16px)
- Small Labels: text-sm (14px)
- Swatch Captions: text-xs font-medium (12px)
- Badge: text-sm font-medium uppercase tracking-wide

**Special Treatment**: The word "Tint" or "Shades" in H1 uses animated rainbow gradient (background-clip: text) with 10-second animation cycle, respecting prefers-reduced-motion

## Layout System

**Container Constraints**:
- Maximum content width: 1200px (max-w-7xl)
- Horizontal padding: px-6 md:px-8
- Vertical section spacing: py-16 md:py-24

**Tailwind Spacing Primitives**: Use 2, 4, 6, 8, 12, 16, 24 units
- Micro spacing (within cards): gap-2, gap-4, p-4, p-6
- Component spacing: mb-8, mb-12, mt-16
- Section spacing: py-16, py-24

**Grid Layout for Color Columns**:
- Horizontal scrollable container (overflow-x-auto)
- Each column: min-w-[180px] md:min-w-[200px]
- Column gap: gap-6 md:gap-8
- Left gutter for step labels: w-16 fixed width
- Support 3-8 columns with smooth horizontal scroll

## Component Library

### Hero Section
- Full-width background (white)
- Centered content with max-w-4xl
- Badge above H1: rounded-full px-4 py-1.5 with border
- H1 with rainbow gradient on "Tint" or "Shades"
- Subhead: text-lg md:text-xl, max-w-3xl, muted color
- Vertical spacing: gap-6 between elements

### Control Bar
- Sticky top bar or prominent section above grid
- Horizontal flex layout with gap-3 wrapping on mobile
- Button groups logically separated with subtle divider
- Primary actions (Add Color, Bulk Import) more prominent
- Export/utility buttons secondary treatment

### Color Column Cards
- Vertical card per color: rounded-xl border shadow-sm
- Column header: p-6 with editable title and HEX display
- Swatch grid: vertical stack with no gaps between swatches
- Each swatch: aspect-square or h-20, full-width color block
- Swatch caption overlay: absolute bottom, semi-transparent dark background blur, px-3 py-1.5
- Step labels in left gutter: text-sm, right-aligned, muted
- Copy Column button: full-width at card bottom, p-3

### Individual Swatches
- Clickable blocks with cursor-pointer
- Hover state: subtle scale transform (scale-105) and shadow increase
- Focus state: outline ring-2 for keyboard navigation
- Caption shows: HEX code (uppercase, font-mono) + step % label

### Bulk Import Modal
- Centered overlay: max-w-2xl
- Large textarea: min-h-[240px] rounded-lg border-2 font-mono
- Preview area below textarea showing parsed colors as chips
- Error messages inline with warning icon
- Action buttons: Cancel (ghost) + Import (primary)

### Ad Placeholders
- Fixed height containers: h-[250px] md:h-[120px]
- Centered placeholder text or subtle border
- Positioned: below hero, mid-page (after grid, before How It Works), above footer
- Light background fill to reserve space

### CTA Card (Color Palette Fixer)
- Full-width card with rounded-xl border shadow-md
- Two-column layout on desktop: content left, button right
- Subtle background tint or gradient
- Medium prominence - native, not intrusive

### Content Sections
- How It Works: 3 columns on desktop, stack on mobile, numbered circles with large icons
- Why Designers Use: Bulleted list with checkmark icons, max-w-3xl
- FAQ: Accordion pattern with chevron indicators, border-b dividers
- Related Tools: Horizontal card grid, 2-4 columns

### Buttons
**Primary**: Rounded-lg px-6 py-3 font-semibold shadow-sm
**Secondary**: Rounded-lg px-6 py-3 border-2 font-semibold
**Ghost**: Rounded-lg px-4 py-2 hover:background subtle
**Icon Only**: Rounded-full p-2 with hover background

Large click targets: min-h-[44px] for all interactive elements

### Toast Notifications
- Fixed bottom-center position
- Rounded-lg shadow-lg with slide-up animation
- Auto-dismiss after 2 seconds
- Shows: "Copied!", "Column copied!", "All codes copied!"

## Cards & Containers

**Card Style**:
- Border radius: rounded-xl (12px)
- Border: 1px solid with subtle gray
- Shadow: shadow-sm default, shadow-md on hover
- Background: white (#FFFFFF)
- Padding: p-6 for content areas

**Visual Hierarchy**:
- Primary cards (color columns): shadow-sm, border
- Secondary cards (CTA, related tools): subtle background, lighter shadow
- Utility containers (export options): border only, no shadow

## Responsive Behavior

**Breakpoints**:
- Mobile: < 768px (stack everything, full-width buttons)
- Tablet: 768px - 1024px (2-column grids, horizontal scroll for color columns)
- Desktop: > 1024px (multi-column layouts, side-by-side controls)

**Color Grid**:
- Mobile: Show 2-3 columns in viewport, horizontal scroll
- Desktop: Show all columns if ≤5, else scroll with fade indicators

**Controls**:
- Mobile: Stack vertically with full-width buttons
- Desktop: Horizontal flex with grouped sections

## Accessibility Requirements

- Semantic HTML5: header, main, section, article, footer
- Heading hierarchy: Single h1, proper h2/h3 nesting
- ARIA labels on icon-only buttons and interactive swatches
- Keyboard navigation: Tab order follows visual flow, Enter/Space to activate
- Focus indicators: 2px ring with offset
- Color contrast: WCAG AA minimum (4.5:1 for text)
- Skip to main content link for screen readers

## Images

**Hero Background** (Optional): 
Subtle geometric pattern or abstract color wave as background element - very light opacity (10-15%), doesn't compete with content

**How It Works Icons**:
Use simple line icons from Heroicons - outline style, 48x48px size in numbered circles

**No large hero image** - this is a utility tool where the color grid IS the hero visual element

## Animation Guidelines

**Minimal & Purposeful**:
- Rainbow gradient: 10s linear infinite on H1 keyword only
- Swatch hover: 150ms scale transform
- Toast slide-up: 200ms ease-out entrance
- Modal fade: 200ms backdrop + 250ms scale transform
- **Respect prefers-reduced-motion**: Disable all animations when detected

**No Auto-playing Animations**: All motion user-initiated except gradient (which is subtle)

## Footer Design

- Multi-column layout on desktop (3-4 columns)
- Logo + tagline in first column
- Quick links, Related Tools, Legal in subsequent columns
- Bottom bar with copyright and social links
- Subtle top border separator
- Generous padding: py-12

## Legal Pages (/privacy-policy, /terms, /contact)

- Simple single-column layout, max-w-3xl
- Standard typography hierarchy with h1, h2, p
- Generous line-height (1.7) for readability
- Contact page: Simple form with name, email, message fields