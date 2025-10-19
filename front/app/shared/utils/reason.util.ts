import {ReasonTypeType} from "../../../types/reason-type.type"

export class ReasonUtil {
  static getReason(status: ReasonTypeType | undefined | null): { name: string } {
    let name = 'Уважительная';

    switch (status) {
      case ReasonTypeType.RESPECTFUL:
        name = 'Уважительная';
        break;
      case ReasonTypeType.DISRESPECTFUL:
        name = 'Неуважительная';
        break;
    }

    return {name};

  }
}
