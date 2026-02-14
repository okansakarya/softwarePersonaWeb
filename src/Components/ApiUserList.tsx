import type { ApiUser } from "../Interfaces/apiUser";

type ApiUserListProps = {
  users: ApiUser[]
  loading: boolean
  error: string | null
  onRefresh?: () => void
};

export function ApiUserList({
  users,
  loading,
  error,
  onRefresh,
}: ApiUserListProps) {
  return (
    <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          API'den Gelen Veriler
        </h2>
        {onRefresh && (
          <button
            type="button"
            onClick={onRefresh}
            disabled={loading}
            className="rounded-lg bg-gray-200 dark:bg-gray-700 px-3 py-1.5 text-sm font-medium text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50"
          >
            API'den Yenile
          </button>
        )}
      </div>

      {loading && (
        <p className="py-4 text-center text-gray-500 dark:text-gray-400">
          Yükleniyor...
        </p>
      )}

      {error && (
        <p className="rounded border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20 px-4 py-3 text-red-700 dark:text-red-300">
          Hata: {error}
        </p>
      )}

      {!loading && !error && users.length === 0 && (
        <p className="py-4 text-center text-gray-500 dark:text-gray-400">
          Veri bulunamadı.
        </p>
      )}

      {!loading && !error && users.length > 0 && (
        <ul className="space-y-2">
          {users.map((user) => (
            <li
              key={user.id}
              className="flex flex-wrap items-center gap-x-4 gap-y-1 rounded border border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 px-4 py-3"
            >
              <span className="font-medium text-gray-900 dark:text-white">
                {user.name}
              </span>
              <span className="text-gray-600 dark:text-gray-400">
                {user.email}
              </span>
              {user.phone && (
                <span className="text-sm text-gray-500 dark:text-gray-500">
                  {user.phone}
                </span>
              )}
              {user.company?.name && (
                <span className="text-sm text-gray-500 dark:text-gray-500">
                  {user.company.name}
                </span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
