import { DateTime } from "luxon";

export type ExpirationDuration = {
    years?: number;
    months?: number;
    days?: number;
};

export class ExpirationHelper {
    private static addDurationToCurrentDate(
        duration: ExpirationDuration
    ): DateTime {
        return DateTime.local().plus(duration);
    }

    static getExpirationDate(duration: ExpirationDuration): Date {
        return ExpirationHelper.addDurationToCurrentDate(duration).toJSDate();
    }

    static getValidityInMillis(duration: ExpirationDuration): number {
        return ExpirationHelper.addDurationToCurrentDate(duration).diff(
            DateTime.local(),
            "milliseconds"
        ).milliseconds;
    }
}
