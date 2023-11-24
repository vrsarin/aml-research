#See https://aka.ms/customizecontainer to learn how to customize your debug container and how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/runtime:7.0 AS base
WORKDIR /app

FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /src
COPY ["core/info.sarins.workers.documents.loader/info.sarins.workers.documents.loader.csproj", "core/info.sarins.workers.documents.loader/"]
COPY ["common/info.sarins.services.shared/info.sarins.services.shared.csproj", "common/info.sarins.services.shared/"]
RUN dotnet restore "core/info.sarins.workers.documents.loader/info.sarins.workers.documents.loader.csproj"
COPY . .
WORKDIR "/src/core/info.sarins.workers.documents.loader"
RUN dotnet build "info.sarins.workers.documents.loader.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "info.sarins.workers.documents.loader.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "info.sarins.workers.documents.loader.dll"]