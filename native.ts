import { CspPolicies, ConnectSrc } from "@main/csp";

CspPolicies["https://naas.isalman.dev"] = ConnectSrc;

export async function fetchNoReason(): Promise<string | null> {
    try {
        const response = await fetch("https://naas.isalman.dev/no");
        const json = await response.json();
        return json.reason ?? null;
    } catch (err) {
        console.error("[NoCommand native.ts] Error:", err);
        return null;
    }
}
