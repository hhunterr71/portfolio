---
title: Building Telemetry Backfill Tooling
summary: CLI tooling that backfills (and safely deletes) historical building-meter data in a telemetry datalake, built for a Google facilities engagement.
tags: [coding, professional]
repoUrl: https://github.com/hhunterr71/backfill_tooling
codeAvailable: true
order: 3
---

## Description

Building meters go offline, get mis-mapped, or get onboarded late — and when that happens, someone needs to retroactively load the correct historical readings (electricity, gas, water) into the data warehouse so reporting and analytics aren't left with gaps. This is a pair of Python CLI tools I built to automate that process for a building-telemetry datalake as part of a client engagement at DB Engineering.

The backfill tool takes raw CSV exports from the building's metering system, normalizes inconsistent column names per meter against a standardized field/unit mapping, pivots the data into the long/flat format the ingestion pipeline expects, and generates ready-to-run commands per device. A companion delete tool is the inverse — building and executing delete operations for a given meter and date range, with a two-phase "generate, review, then execute" flow so a bad delete range can't silently wipe more than intended.

## Code Sample

Timestamp handling turned out to be the subtlest part of this — mixed input formats, normalizing to UTC then converting to local time, and an aggregation offset that has to be applied exactly once even if the script is re-run on partially-processed data:

```python
def format_timestamps(df, timestamp_col, target_timezone="America/Los_Angeles"):
    df[timestamp_col] = pd.to_datetime(df[timestamp_col], utc=True, format="mixed")
    df[timestamp_col] = df[timestamp_col].dt.tz_convert(target_timezone)

    already_offset = _detect_existing_offset(df, timestamp_col)
    if not already_offset:
        df[timestamp_col] = df[timestamp_col] + pd.Timedelta(minutes=15)

    return df
```

## Methods and Tools

1. **Data Wrangling:** pandas for CSV/Excel parsing, pivot tables, and timezone-aware datetime normalization.
2. **Field Mapping:** a YAML-defined ontology mapping raw per-meter column names to standardized field names, shared across tooling.
3. **Safety Gates:** a generate-then-review-then-execute flow on the delete path, so destructive operations require an explicit confirmation step after seeing exactly what would be removed.
4. **CLI Design:** supports both interactive (menu-driven) and flag-based invocation for scripting.

## Next Steps

1. Add automated tests around the timestamp-offset idempotency logic, since that's the easiest place for a silent double-shift bug to creep back in.
2. Package the field-mapping ontology as its own versioned dependency rather than a loose YAML file.
