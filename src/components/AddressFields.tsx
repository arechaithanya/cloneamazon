type AddressFieldsProps = {
  prefix?: string;
  defaults?: {
    fullName?: string;
    phone?: string;
    line1?: string;
    line2?: string;
    city?: string;
    state?: string;
    postalCode?: string;
    country?: string;
    isDefault?: boolean;
  };
  showDefaultCheckbox?: boolean;
};

export function AddressFields({
  prefix = "",
  defaults = {},
  showDefaultCheckbox = true,
}: AddressFieldsProps) {
  const n = (field: string) => (prefix ? `${prefix}${field}` : field);

  return (
    <div className="space-y-2 text-sm">
      <label className="block">
        Full name
        <input
          name={n("fullName")}
          required
          defaultValue={defaults.fullName}
          className="mt-1 w-full rounded border px-2 py-1.5"
        />
      </label>
      <label className="block">
        Phone
        <input
          name={n("phone")}
          required
          defaultValue={defaults.phone}
          className="mt-1 w-full rounded border px-2 py-1.5"
        />
      </label>
      <label className="block">
        Address line 1
        <input
          name={n("line1")}
          required
          defaultValue={defaults.line1}
          className="mt-1 w-full rounded border px-2 py-1.5"
        />
      </label>
      <label className="block">
        Address line 2
        <input name={n("line2")} defaultValue={defaults.line2} className="mt-1 w-full rounded border px-2 py-1.5" />
      </label>
      <div className="grid grid-cols-2 gap-2">
        <label className="block">
          City
          <input
            name={n("city")}
            required
            defaultValue={defaults.city}
            className="mt-1 w-full rounded border px-2 py-1.5"
          />
        </label>
        <label className="block">
          State
          <input
            name={n("state")}
            required
            defaultValue={defaults.state}
            className="mt-1 w-full rounded border px-2 py-1.5"
          />
        </label>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <label className="block">
          PIN code
          <input
            name={n("postalCode")}
            required
            defaultValue={defaults.postalCode}
            className="mt-1 w-full rounded border px-2 py-1.5"
          />
        </label>
        <label className="block">
          Country
          <input
            name={n("country")}
            defaultValue={defaults.country ?? "IN"}
            className="mt-1 w-full rounded border px-2 py-1.5"
          />
        </label>
      </div>
      {showDefaultCheckbox && (
        <label className="flex items-center gap-2 pt-1">
          <input type="checkbox" name={n("isDefault")} defaultChecked={defaults.isDefault} />
          Set as default address
        </label>
      )}
    </div>
  );
}
