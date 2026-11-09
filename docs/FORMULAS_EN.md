# Solar Estimator — Calculation formulas (preliminary)

**Scope:** transparent first-order calculations, not an execution-ready engineering design. All variables use SI units unless specified. Currency is Iranian rial (IRR). The sample inputs are not live market or climate values.

## Geometry
- Rectangle gross area: `A_gross = length_m × width_m`.
- Usable area: `A_usable = A_gross × usable_percent / 100`.
- Polygon UTM area using the shoelace algorithm: `A = |Σ(x_i y_(i+1) − x_(i+1) y_i)| / 2` (m²), provided coordinates are in one consistent projected CRS.
- Preliminary packing count: `N_area = floor(A_usable × packing_factor / (module_length_m × module_width_m))`. This is **not** true spatial packing and does not account for row spacing or access corridors independently.
- Manual requested modules are constrained by the same estimated area ceiling. Strings are complete: `N_installed = N_series × floor(N_requested/N_series)`.

## PV array and inverter
- `P_DC_kWp = N_installed × module_power_Wp / 1000`.
- `P_AC_kW = inverter_count × inverter_nominal_AC_kW`.
- `DC_AC_ratio = P_DC_kWp / P_AC_kW`.
- `Voc_string_cold = N_series × Voc_STC × [1 + gamma_Voc/100 × (T_cold − 25°C)]`.
- `Vmp_string_STC = N_series × Vmp_STC`.
- `parallel_strings_per_MPPT = ceil(total_strings / (MPPT_count × inverter_count))` (conservative assignment assumption).
- `I_MPPT = parallel_strings_per_MPPT × Imp_STC` and `Isc_MPPT = parallel_strings_per_MPPT × Isc_STC`.
- Check these currents against inverter per-MPPT maximum continuous and short-circuit input ratings; compare `Voc_string_cold` to maximum DC voltage, and `Vmp_string_STC` to MPPT operating range.
- The supplied module sheets do **not** explicitly list a voltage-temperature coefficient for `Vmp`; thus the hot-cell MPPT voltage requires additional validated data, rather than inferring an exact value from `gamma_Pmax`.
- Approximate DC/AC ratio advisory (0.8–1.4) is **not** a universal electrical pass/fail rule. Manufacturer maximum PV power, clipping and lifetime yield should be considered separately.

## Solar production
- `E_month_kWh = P_DC_kWp × PSH_day_month × days_in_month × (1 − other_losses_fraction) × orientation_factor`.
- `E_year = Σ E_month`.
- `SpecificYield = E_year / P_DC_kWp`.
- `CapacityFactor_AC = E_year / (P_AC_kW × 8760)`.
- **Not modeled:** hourly clipping, shading, temperature-dependent efficiency, bifacial gain, inverter part-load curve, snow and soiling seasonality, battery dispatch, time-series self-consumption.

## Electricity sales, self-use, and investments
- `Revenue_year1 = E_export_year × export_tariff_IRR_per_kWh + E_self_year × avoided_energy_value_IRR_per_kWh`.
- `CAPEX = N_panels × unit_panel_price + N_inverters × unit_inverter_price + Σ(q_i × unit_price_i) + other_CAPEX`.
- `Revenue_y = Revenue_year1 × (1 − degradation)^(y−1) × (1 + tariff_growth)^(y−1)`.
- `OPEX_y = CAPEX × OPEX_percent + replacement_cost_y` (constant nominal OPEX approximation).
- `CF_0 = −CAPEX`, `CF_y = Revenue_y − OPEX_y` for y=1..20.
- `NPV = Σ(CF_y/(1+discount_rate)^y)` for y=0..20.
- `IRR` is the root of `NPV(IRR)=0` found by bisection where a sign change exists; otherwise it is unavailable.
- `Payback` is first nonnegative cumulative undiscounted cash flow with fractional-year interpolation; no payback is shown if not achieved within 20 years.
- `LCOE = [CAPEX + Σ(OPEX_y/(1+r)^y)] / Σ(E_y/(1+r)^y)`. This is a simple nominal discounted model, before taxes and financing.

## Data quality, caveats, and minimum evidence
- Trina Vertex 645–665 W and Vertex N 695–720 W records are extracted from the user-provided 2022/2024 manufacturer datasheets; module voltages and currents are STC values.
- Growatt MID 25–40 kW KTL3-X values come from a preliminary manufacturer datasheet (max DC voltage 1100 V, MPPT 200–1000 V, current 26 A per MPPT, short-circuit 32 A per MPPT).
- Validity of each exact model revision, availability, certification and allowed grid connection must be confirmed independently.
- Off-grid and hybrid systems require a separately verified inverter and storage simulation. Current input fields alone do not constitute battery sizing.
- In the software, distinguish `verified datasheet spec`, `user-supplied value`, `sample input`, `calculated output`, and `unverified/blocked`.

