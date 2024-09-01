# 0.3.5
- Fixed AxiosError was occurred instead of EnkaNetworkError.
# 0.3.4
- Fixed HoyoType filter in EnkaSystem#fetchEnkaGameAccounts().
# 0.3.3
- Better uid type in InvalidUidFormatError.
# 0.3.2
- Exports InvalidUidFormatError for external use.
# 0.3.1
- Fixed that EnkaGameAccount#user will be undefined instead of null.
- Moved InvalidUidFormatError to enka-system.
# 0.3.0
- Added EnkaProfile#system, EnkaProfile#fetchGameAccounts(), EnkaProfile#fetchGameAccount(), and EnkaProfile#fetchBuilds().
- Added EnkaGameAccount#system, and EnkaGameAccount#fetchBuilds().
- Better typings with generics.
# 0.2.0
- Made EnkaSystem non-static.
- Changed the type of HoyoType to 0 | 1.
# 0.1.0
- Released the first version of `enka-system`.