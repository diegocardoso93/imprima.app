<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class CreateMerchantsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('merchants', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->text('description')->nullable();
            $table->string('phone')->nullable();
            $table->string('zip')->nullable();
            $table->string('city')->nullable();
            $table->char('uf', 2)->nullable();
            $table->string('neighborhood')->nullable();
            $table->string('address')->nullable();
            $table->string('address_extra')->nullable();
            $table->double('lat')->nullable();
            $table->double('lon')->nullable();
            $table->integer('max_distance')->default(20);
            $table->boolean('delivery')->nullable();
            $table->integer('status')->default(1); // 1 ativo, 0 desativo
            $table->timestamps();
        });

        DB::statement('CREATE EXTENSION IF NOT EXISTS cube');
        DB::statement('CREATE EXTENSION IF NOT EXISTS earthdistance');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('merchants');
    }
}
