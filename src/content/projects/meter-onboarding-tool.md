---
title: Meter Onboarding Tool
summary: A CLI tool that translates raw building-meter discovery data into Google's open-source Digital Buildings Ontology (UDMI) format ahead of onboarding.
tags: [coding, professional]
repoUrl: https://github.com/hhunterr71/meter_onboarding_tool
codeAvailable: true
order: 4
---

## Description

Before a utility meter (electric, water, gas) can be registered into a building management platform, its raw discovered data points need to be translated into a standardized schema the platform understands. This tool automates that translation against Google's open-source [Digital Buildings Ontology (DBO) / UDMI](https://github.com/google/digitalbuildings) standard, built for a client engagement at DB Engineering.

Given a meter's raw point names (e.g. `kWh`, `freq`), the tool renames them to DBO standard fields (`energy_accumulator`, `line_frequency_sensor`), normalizes units, and ranks the device against canonical DBO types by how completely its discovered points cover each type's required and optional fields — surfacing the best-fit type rather than requiring someone to hand-match it. From there it generates the UDMI translation YAML needed for onboarding.

## Code Sample

The core of the type-matching logic — scoring how well a device's discovered fields cover a candidate DBO type, then ranking candidates by required-field coverage first, with total matches as a tiebreaker:

```python
def _score_one(type_name, present, type_def, total_present):
    required = [f for f, v in type_def.items() if v == "required"]
    optional = [f for f, v in type_def.items() if v == "optional"]
    return MatchResult(
        type_name=type_name,
        total_defined=len(required) + len(optional),
        total_matched=sum(1 for f in required if f in present) + sum(1 for f in optional if f in present),
        required_total=len(required),
        required_matched=sum(1 for f in required if f in present),
        missing_required=[f for f in required if f not in present],
        missing_optional=[f for f in optional if f not in present],
        total_present=total_present,
    )


def rank_types(present, category, type_map):
    results = [
        _score_one(type_name, present, type_def, len(present))
        for type_name, type_def in (type_map.get(category) or {}).items()
        if type_def
    ]
    results.sort(key=lambda r: (r.required_pct, -r.unlinked, r.total_matched), reverse=True)
    return results
```

## Methods and Tools

1. **Ontology Matching:** dataclass-driven scoring against Google's DBO type definitions, ranking by required-field coverage.
2. **Data Wrangling:** pandas for translating discovery data into UDMI's nested YAML/JSON translation format.
3. **Testing:** a `unittest`-based suite with mocked fixtures simulating real UDMI building/device structures.
4. **Pipeline Integration:** later modes in the tool drive the onboarding submission itself, integrating with the building platform's backend services.

## Next Steps

1. Add packaging (`pyproject.toml`) so the tool can be installed and versioned rather than run from a checkout.
2. Bring the README back in sync — it documents an earlier 4-mode version of the tool; the CLI has since grown to 6 modes including the onboarding-submission flow.
