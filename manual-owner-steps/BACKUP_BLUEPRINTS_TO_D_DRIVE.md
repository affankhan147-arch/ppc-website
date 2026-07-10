# Backup Blueprints To D Drive

Run this from the repository root on the local laptop:

```powershell
powershell -ExecutionPolicy Bypass -File ".\scripts\20_backup_project_blueprints_to_D_drive.ps1"
```

Target folder:

`D:\PPC_Project_Blueprints\PPC_Lead_Generation_Platform_Blueprint`

The script does not copy `.env`, private keys, node_modules, `.next`, or credential files.
